import React, { useState } from "react";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, FormLabel, Input, Select, ModalFooter, Image } from "@chakra-ui/react";
import { FaPlus, FaEdit } from "react-icons/fa";

const Index = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", type: "regular", schedule: "9AM - 5PM" },
    { id: 2, name: "Jane Smith", type: "regular", schedule: "10AM - 6PM" },
    { id: 3, name: "Mike Johnson", type: "outsourced", schedule: "Event A" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
    onClose();
  };

  const handleEditEmployee = (employee) => {
    setEmployees(employees.map((emp) => (emp.id === employee.id ? employee : emp)));
    onClose();
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Employee Attendance Management
      </Heading>
      <Image src="https://images.unsplash.com/photo-1507208773393-40d9fc670acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxlbXBsb3llZXMlMjB3b3JraW5nJTIwaW4lMjBhbiUyMG9mZmljZXxlbnwwfHx8fDE3MTEzNTk1ODJ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Employees" mb={4} />
      <Tabs>
        <TabList>
          <Tab>Regular Employees</Tab>
          <Tab>Outsourced Employees</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="blue"
                onClick={() => {
                  setSelectedEmployee(null);
                  onOpen();
                }}
              >
                Add Employee
              </Button>
            </Box>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Schedule</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees
                  .filter((employee) => employee.type === "regular")
                  .map((employee) => (
                    <Tr key={employee.id}>
                      <Td>{employee.name}</Td>
                      <Td>{employee.schedule}</Td>
                      <Td>
                        <Button
                          leftIcon={<FaEdit />}
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Event</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees
                  .filter((employee) => employee.type === "outsourced")
                  .map((employee) => (
                    <Tr key={employee.id}>
                      <Td>{employee.name}</Td>
                      <Td>{employee.schedule}</Td>
                      <Td>
                        <Button
                          leftIcon={<FaEdit />}
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEmployee ? "Edit Employee" : "Add Employee"}</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input defaultValue={selectedEmployee?.name} placeholder="Enter employee name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Employee Type</FormLabel>
              <Select defaultValue={selectedEmployee?.type}>
                <option value="regular">Regular</option>
                <option value="outsourced">Outsourced</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Schedule</FormLabel>
              <Input defaultValue={selectedEmployee?.schedule} placeholder="Enter schedule" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                const employee = {
                  name: document.querySelector("input[placeholder='Enter employee name']").value,
                  type: document.querySelector("select").value,
                  schedule: document.querySelector("input[placeholder='Enter schedule']").value,
                };
                if (selectedEmployee) {
                  handleEditEmployee({ ...selectedEmployee, ...employee });
                } else {
                  handleAddEmployee(employee);
                }
              }}
            >
              {selectedEmployee ? "Update" : "Add"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
