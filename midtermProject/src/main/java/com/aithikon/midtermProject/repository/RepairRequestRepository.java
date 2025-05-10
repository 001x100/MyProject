package com.aithikon.midtermProject.repository;

import com.aithikon.midtermProject.model.RepairRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepairRequestRepository extends MongoRepository<RepairRequest, String> {
}