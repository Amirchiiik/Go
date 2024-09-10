package main

import "fmt"

type Person struct {
	name string
	age  int
}

func (p Person) Greet() {
	fmt.Printf("Hello, %s!\n", p.name)
}

func main() {
	var p Person
	fmt.Scan(&p.name)
	p.Greet()
}

//struct in Go is defined using the struct keyword

//methods in Go are similar, but have a receiver which is used to link with a type (like struct)

//yes, in go methods can be linked with any types including user custom types or built-in types
