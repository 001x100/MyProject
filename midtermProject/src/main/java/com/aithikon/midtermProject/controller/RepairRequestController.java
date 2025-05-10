package com.aithikon.midtermProject.controller;

import com.aithikon.midtermProject.model.RepairRequest;
import com.aithikon.midtermProject.service.RepairRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RepairRequestController {

    @Autowired
    private RepairRequestService repairRequestService;

    // เพิ่มคำขอซ่อมใหม่
    @PostMapping
    public RepairRequest addRepairRequest(@RequestBody RepairRequest repairRequest) {
        return repairRequestService.addRepairRequest(repairRequest);
    }

    // ดึงคำขอซ่อมทั้งหมด
    @GetMapping
    public List<RepairRequest> getAllRepairRequests() {
        return repairRequestService.getAllRepairRequests();
    }

    // ดึงคำขอซ่อมตาม ID
    @GetMapping("/{id}")
    public RepairRequest getRepairRequestById(@PathVariable String id) {
        return repairRequestService.getRepairRequestById(id);
    }

    // ลบคำขอซ่อมตาม ID
    @DeleteMapping("/{id}")
    public void deleteRepairRequest(@PathVariable String id) {
        repairRequestService.deleteRepairRequest(id);
    }
}