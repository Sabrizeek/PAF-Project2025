package backend.controller;

import backend.model.Comment;
import backend.repository.CommentRepository;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/interactions")
public class LikeCommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    // In-memory like store (replace with DB for production)
    private final Map<String, Map<String, Boolean>> likeStore = new HashMap<>();

    // ---------- Likes ----------
    @PostMapping("/like")
    public ResponseEntity<?> toggleLike(@RequestParam String targetID, @RequestParam String userID) {
        likeStore.putIfAbsent(targetID, new HashMap<>());
        Map<String, Boolean> likes = likeStore.get(targetID);

        likes.put(userID, !likes.getOrDefault(userID, false));
        return ResponseEntity.ok(Map.of("liked", likes.get(userID)));
    }

    @GetMapping("/likes")
    public ResponseEntity<Map<String, Boolean>> getLikes(@RequestParam String targetID) {
        return ResponseEntity.ok(likeStore.getOrDefault(targetID, new HashMap<>()));
    }

    @DeleteMapping("/like")
    public ResponseEntity<?> unlike(@RequestParam String targetID, @RequestParam String userID) {
        if (likeStore.containsKey(targetID)) {
            likeStore.get(targetID).remove(userID);
        }
        return ResponseEntity.ok("Unliked successfully.");
    }

    // ---------- Comments ----------
    @PostMapping("/comment")
    public ResponseEntity<Comment> addComment(@RequestBody Map<String, String> request) {
        String userID = request.get("userID");
        String targetID = request.get("targetID");
        String content = request.get("content");

        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setUserID(userID);
        comment.setTargetID(targetID);
        comment.setContent(content);

        String userFullName = userRepository.findById(userID)
                .map(user -> user.getFullname())
                .orElse("Anonymous");
        comment.setUserFullName(userFullName);

        String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        comment.setCreatedAt(currentDateTime);

        commentRepository.save(comment);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getComments(@RequestParam String targetID) {
        return ResponseEntity.ok(commentRepository.findByTargetID(targetID));
    }

    @PutMapping("/comment/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable String commentId, @RequestBody Map<String, String> request) {
        String userID = request.get("userID");
        String content = request.get("content");

        Optional<Comment> optional = commentRepository.findById(commentId);
        if (optional.isPresent() && optional.get().getUserID().equals(userID)) {
            Comment comment = optional.get();
            comment.setContent(content);
            commentRepository.save(comment);
            return ResponseEntity.ok(comment);
        }
        return ResponseEntity.status(403).body("Unauthorized or comment not found");
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable String commentId, @RequestParam String userID) {
        Optional<Comment> optional = commentRepository.findById(commentId);
        if (optional.isPresent()) {
            Comment comment = optional.get();
            if (comment.getUserID().equals(userID)) {
                commentRepository.deleteById(commentId);
                return ResponseEntity.ok("Comment deleted");
            }
        }
        return ResponseEntity.status(403).body("Unauthorized or comment not found");
    }

    // ---------- New: Fetch All Interactions ----------
    @GetMapping
    public ResponseEntity<?> getAllInteractions() {
        List<Comment> allComments = commentRepository.findAll();

        // Group comments by targetID
        Map<String, List<Comment>> groupedComments = new HashMap<>();
        for (Comment c : allComments) {
            groupedComments.computeIfAbsent(c.getTargetID(), k -> new ArrayList<>()).add(c);
        }

        // Combine likes + comments into interaction objects
        List<Map<String, Object>> interactionList = new ArrayList<>();
        for (String targetID : groupedComments.keySet()) {
            Map<String, Object> interaction = new HashMap<>();
            interaction.put("id", targetID);
            interaction.put("comments", groupedComments.get(targetID));
            interaction.put("likes", likeStore.getOrDefault(targetID, new HashMap<>()));
            interactionList.add(interaction);
        }

        return ResponseEntity.ok(interactionList);
    }
}
