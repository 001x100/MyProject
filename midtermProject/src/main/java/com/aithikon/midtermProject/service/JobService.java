package com.aithikon.midtermProject.service;

import com.aithikon.midtermProject.model.Job;
import com.aithikon.midtermProject.model.Technician;
import com.aithikon.midtermProject.repository.JobRepository;
import com.aithikon.midtermProject.repository.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private TechnicianRepository techRepo;

    // ยืนยันงานและกำหนดช่าง
    public Job confirmJob(String jobId, String technicianId) {
        Job job = jobRepo.findById(jobId).orElseThrow(() -> 
            new NoSuchElementException("Job with ID " + jobId + " not found"));

        Technician technician = techRepo.findById(technicianId).orElseThrow(() -> 
            new NoSuchElementException("Technician with ID " + technicianId + " not found"));

        job.setStatus("IN_PROGRESS");
        job.setTechnician(Map.of(
            "id", technician.getId(),
            "name", technician.getName(),
            "skills", technician.getSkills(),
            "phone", technician.getPhone()
        ));
        return jobRepo.save(job);
    }
    public Job getJobById(String id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));
    }

    // ดึงข้อมูลคำขอซ่อมจากงาน
    public Map<String, String> getRequestByJobId(String jobId) {
        Job job = getJobById(jobId);
        return job.getRequest();
    }
    // ทำงานเสร็จสมบูรณ์
    public Job completeJob(String jobId) {
        Job job = jobRepo.findById(jobId).orElseThrow(() -> 
            new NoSuchElementException("Job with ID " + jobId + " not found"));

        job.setStatus("DONE");
        return jobRepo.save(job);
    }

    // ดึงข้อมูลงานทั้งหมด
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    // ดึงข้อมูลช่างทั้งหมด
    public List<Technician> getAllTechnicians() {
        return techRepo.findAll();
    }

    // เพิ่มช่างใหม่
    public Technician addTechnician(Technician technician) {
        return techRepo.save(technician);
    }

    // ลบช่าง
    public void deleteTechnician(String id) {
        techRepo.deleteById(id);
    }

    // เพิ่มงานใหม่
    public Job addJob(Job job) {
        job.setStatus("กำลังดำเนินการ");
        return jobRepo.save(job);
    }

    // ลบงาน
    public void deleteJob(String id) {
        jobRepo.deleteById(id);
    }

    // ดึงข้อมูลช่างตาม ID
    public Technician getTechnicianById(String id) {
        return techRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Technician not found with ID: " + id));
    }

    // อัปเดตข้อมูลช่าง
    public Technician updateTechnician(String id, Technician updatedTechnician) {
        Technician existingTechnician = techRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Technician not found with ID: " + id));

        if (updatedTechnician.getName() != null) {
            existingTechnician.setName(updatedTechnician.getName());
        }
        if (updatedTechnician.getSkills() != null) {
            existingTechnician.setSkills(updatedTechnician.getSkills());
        }
        if (updatedTechnician.getPhone() != null) {
            existingTechnician.setPhone(updatedTechnician.getPhone());
        }

        return techRepo.save(existingTechnician);
    }

    // อัปเดตข้อมูลงาน
    public Job updateJob(String id, Job updatedJob) {
        Job existingJob = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));

        if (updatedJob.getRequest() != null) {
            existingJob.setRequest(updatedJob.getRequest());
        }
        if (updatedJob.getTechnician() != null) {
            existingJob.setTechnician(updatedJob.getTechnician());
        }
        if (updatedJob.getStatus() != null) {
            existingJob.setStatus(updatedJob.getStatus());
        }

        return jobRepo.save(existingJob);
    }
}
