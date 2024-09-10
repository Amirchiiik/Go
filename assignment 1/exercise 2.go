package main

import (
	"fmt"
	"reflect"
)

var a int

func main() {
	a = 123

	var a string = "asdfasasdf"
	var b string = "asdf"
	var c bool = true
	var d float64 = 3.14
	e := 5.64
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(e)
	fmt.Println(reflect.TypeOf(e))
}

// var is used both inside or outside, when := only inside function
// var we can be used separately, := can not

//type of variable is defined by reflect.TypeOf

// we can not alter the type after it's declaring, because Go is a statically typed language
