package backend.model;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "posts")
public class PostManagementModel {

    @Id
    private String id;

    @NotBlank(message = "userID is required")
    private String userID;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private List<String> media = new ArrayList<>();
    private Map<String, Boolean> likes = new HashMap<>();
    private String category;

    // Constructors
    public PostManagementModel() {}

    public PostManagementModel(String id, String userID, String title, String description, List<String> media) {
        this.id = id;
        this.userID = userID;
        this.title = title;
        this.description = description;
        this.media = media != null ? media : new ArrayList<>();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getMedia() {
        return media;
    }

    public void setMedia(List<String> media) {
        this.media = media != null ? media : new ArrayList<>();
    }

    public Map<String, Boolean> getLikes() {
        return likes;
    }

    public void setLikes(Map<String, Boolean> likes) {
        this.likes = likes != null ? likes : new HashMap<>();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "PostManagementModel{" +
                "id='" + id + '\'' +
                ", userID='" + userID + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", media=" + media +
                ", likes=" + likes +
                ", category='" + category + '\'' +
                '}';
    }
}