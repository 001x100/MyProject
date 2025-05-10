package com.aithikon.midtermProject.model;

import lombok.*;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepairRequest {
    @Id
    private String id;
    private String requestedBy;
    private String symptom;
    private LocalDateTime preferredDateTime;
    private String location;
 
}