package backend.controller;

import backend.model.PostManagementModel;
import backend.repository.PostManagementRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostManagementController {

    @Autowired
    private PostManagementRepository postRepo;

    // CREATE a new post
    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody PostManagementModel post, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", result.getAllErrors().toString()));
        }
        try {
            System.out.println("Creating post: " + post);
            PostManagementModel savedPost = postRepo.save(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        } catch (Exception e) {
            System.err.println("Error creating post: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create post: " + e.getMessage()));
        }
    }

    // GET all posts
    @GetMapping
    public ResponseEntity<List<PostManagementModel>> getAllPosts() {
        return ResponseEntity.ok(postRepo.findAll());
    }

    // GET a post by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id) {
        Optional<PostManagementModel> post = postRepo.findById(id);
        return post.isPresent()
                ? ResponseEntity.ok(post.get())
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Post not found with id: " + id));
    }

    // UPDATE a post
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable String id, @Valid @RequestBody PostManagementModel updatedPost, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", result.getAllErrors().toString()));
        }
        Optional<PostManagementModel> optionalPost = postRepo.findById(id);
        if (optionalPost.isPresent()) {
            PostManagementModel post = optionalPost.get();
            post.setTitle(updatedPost.getTitle());
            post.setDescription(updatedPost.getDescription());
            post.setMedia(updatedPost.getMedia());
            post.setLikes(updatedPost.getLikes());
            post.setCategory(updatedPost.getCategory());
            PostManagementModel savedPost = postRepo.save(post);
            return ResponseEntity.ok(savedPost);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Post not found with id: " + id));
        }
    }

    // DELETE a post
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        if (postRepo.existsById(id)) {
            postRepo.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Post deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Post not found with id: " + id));
        }
    }
}