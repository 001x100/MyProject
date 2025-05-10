package com.aithikon.midtermProject.repository;

import com.aithikon.midtermProject.model.Technician;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface TechnicianRepository extends MongoRepository<Technician, String> {

}
