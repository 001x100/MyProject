package com.aithikon.midtermProject.service;

import com.aithikon.midtermProject.model.RepairRequest;
import com.aithikon.midtermProject.repository.RepairRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class RepairRequestService {

    @Autowired
    private RepairRequestRepository repairRequestRepository;

    // เพิ่มคำขอซ่อมใหม่
    public RepairRequest addRepairRequest(RepairRequest repairRequest) {
        return repairRequestRepository.save(repairRequest);
    }

    // ดึงคำขอซ่อมทั้งหมด
    public List<RepairRequest> getAllRepairRequests() {
        return repairRequestRepository.findAll();
    }

    // ดึงคำขอซ่อมตาม ID
    public RepairRequest getRepairRequestById(String id) {
        return repairRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair Request not found with ID: " + id));
    }

    // ลบคำขอซ่อมตาม ID
    public void deleteRepairRequest(String id) {
        repairRequestRepository.deleteById(id);
    }
}