package com.aithikon.midtermProject.controller;

import com.aithikon.midtermProject.model.Job;
import com.aithikon.midtermProject.model.Technician;
import com.aithikon.midtermProject.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // อนุญาตทุกโดเมน
public class JobController {

    @Autowired
    private JobService jobService;

    // 1. Get all technicians
    @GetMapping("/technicians")
    public List<Technician> getAllTechnicians() {
        return jobService.getAllTechnicians();
    }

    // Add a new technician
    @PostMapping("/technicians")
    public Technician addTechnician(@RequestBody Technician technician) {
        return jobService.addTechnician(technician);
    }

    // 3. Delete a technician
    @DeleteMapping("/technicians/{id}")
    public void deleteTechnician(@PathVariable String id) {
        jobService.deleteTechnician(id);
    }

    // Get Technician by ID
    @GetMapping("/technicians/{id}")
    public Technician getTechnicianById(@PathVariable String id) {
        return jobService.getTechnicianById(id);
    }

    // Update an existing technician
    @PutMapping("/technicians/{id}")
    public Technician updateTechnician(@PathVariable String id, @RequestBody Technician updatedTechnician) {
        return jobService.updateTechnician(id, updatedTechnician);
    }

    // 4. Get all jobs
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // 5. Add a new job
    @PostMapping("/jobs")
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    // 6. Delete a job
    @DeleteMapping("/jobs/{id}")
    public void deleteJob(@PathVariable String id) {
        jobService.deleteJob(id);
    }

    // Update Job
    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable String id, @RequestBody Job updatedJob) {
        return jobService.updateJob(id, updatedJob);
    }

    @PutMapping("/jobs/{jobId}/confirm")
    public Job confirmJob(@PathVariable String jobId, @RequestParam String technicianId) {
        return jobService.confirmJob(jobId, technicianId);
    }

    @PutMapping("/jobs/{jobId}/complete")
    public Job completeJob(@PathVariable String jobId, @RequestBody Map<String, String> body) {
        return jobService.completeJob(jobId);
    }
}
