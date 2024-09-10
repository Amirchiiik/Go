package main

import "fmt"

type Employee struct {
	name string
	age  int
}

type Manager struct {
	Employee
	department string
}

func (e Employee) Work() {
	fmt.Printf("Employee name: %s, Employee age: %d", e.name, e.age)
}

func main() {
	var manager Manager
	fmt.Scan(&manager.name, &manager.age, &manager.department)
	manager.Work()
}

//embedding in go allows a struct to include another struct or type that make all the methods of last accessible to first

//when method is created for embedded type, you can call from the outer struct like manager.Work()

//no, an embedded type can't override a method from outer struct
