package main

import (
	"fmt"
)

func sumtwo(x int, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

func quotient(x int, y int) {
	quotient := x / y
	remainder := x % y
	fmt.Println("quotient:", quotient, "remainder:", remainder)
}

func main() {
	var x, y int
	fmt.Scan(&x, &y)
	fmt.Println(sumtwo(x, y))

	var a, b string
	fmt.Scan(&a, &b)
	fmt.Println(swap(a, b))

	fmt.Scan(&x, &y)
	quotient(x, y)

	//after installing the input parameters, we should specify multiple output that will be returned,
	//for ex. func myFunction(x int, y string) (result int, txt1 string)

	//named return values increase readability of the code and simplifies control of them

	// by _
}
