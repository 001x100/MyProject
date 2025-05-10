package com.aithikon.midtermProject.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;

@Document("jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    private String id;

    // ข้อมูลคำขอซ่อม เช่น ชื่อผู้ร้องขอ, อาคาร, ห้อง, และคำอธิบายปัญหา
    private Map<String, String> request;

    // ข้อมูลช่าง เช่น ID, ชื่อ, ทักษะ, และเบอร์โทรศัพท์
    private Map<String, Object> technician;

    @NotBlank(message = "Status is required")
    private String status;

}
