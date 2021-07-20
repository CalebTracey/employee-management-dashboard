package com.dashboard.backend.employee;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeModelAssembler assembler;
    private final EmployeeRepository repository;

    @Autowired
    public EmployeeController(EmployeeService employeeService, EmployeeModelAssembler assembler, EmployeeRepository repository) {

        this.employeeService = employeeService;
        this.assembler = assembler;
        this.repository = repository;
    }

    @GetMapping()
    CollectionModel<EntityModel<Employee>> all() {
        List<EntityModel<Employee>> employees = employeeService.getEmployees().stream()
                .map(assembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(employees, linkTo(methodOn(EmployeeController.class).all()).withSelfRel());
    }

    @GetMapping("{id}")
    EntityModel<Employee> one(@PathVariable Long id) {

        Employee employee = employeeService.findEmployeeById(id);
        return assembler.toModel(employee);
    }

    @PostMapping("/upload")
    ResponseEntity<?> newEmployee(@RequestBody Employee newEmployee) {

        EntityModel<Employee> entityModel = assembler.toModel(repository.save(newEmployee));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @DeleteMapping("/{employeeId}")
    ResponseEntity<?> deleteEmployee(@PathVariable Long employeeId) {

        repository.deleteById(employeeId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("{employeeId}")
    ResponseEntity<?> replaceEmployee(@RequestBody Employee newEmployee, @PathVariable Long employeeId) {

        Employee updatedEmployee = repository.findById(employeeId)
                .map(employee -> {
                    employee.setName(newEmployee.getName());
                    employee.setJobTitle(newEmployee.getJobTitle());
                    return repository.save(employee);
                }) //
                .orElseGet(() -> {
                    newEmployee.setEmployeeId(employeeId);
                    return repository.save(newEmployee);
                });

        EntityModel<Employee> entityModel = assembler.toModel(updatedEmployee);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }
}