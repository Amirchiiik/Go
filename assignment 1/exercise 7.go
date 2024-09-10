package main

import (
	"fmt"
	"math"
)

type Shape interface {
	area() float64
}

type Rectangle struct {
	height float64
	width  float64
}

type Circle struct {
	radius float64
}

func (r Rectangle) area() float64 {
	return r.height * r.width
}

func (c Circle) area() float64 {
	return c.radius * c.radius * math.Pi
}

func PrintArea(shape Shape) {
	fmt.Printf("Area of shape is: %f\n", shape.area())
}

func main() {
	var r Rectangle
	var c Circle

	fmt.Scan(&r.height, &r.width)
	PrintArea(r)

	fmt.Scan(&c.radius)
	PrintArea(c)
}

//an interface is defined using the interface keyword and contains a list of method signatures without implementations

//multiple types can implement the same interface, and you can use them interchangeably through that interface

//you can check if a type implements a certain interface at compile-time or runtime:
//1) var _ Shape = (*Circle)(nil)
//2) if ok {fmt.Println("Implements Shape, area is:", shape.area())}
