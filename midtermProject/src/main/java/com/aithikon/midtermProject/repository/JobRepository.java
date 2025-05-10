package com.aithikon.midtermProject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.aithikon.midtermProject.model.Job;

public interface JobRepository extends MongoRepository<Job, String> {}
