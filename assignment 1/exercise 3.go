package main

import "fmt"

func main() {
	var i int
	fmt.Scan(&i)
	if i > 0 {
		fmt.Println("Positive")
	} else if i < 0 {
		fmt.Println("Negative")
	} else {
		fmt.Println("Zero")
	}
	////////////////////////////////////////
	var a int
	var sum int
	for i := 0; i < 10; i++ {
		fmt.Scan(&a)
		sum += a
	}
	fmt.Println("Sum: ", sum)
	///////////////////////////////////////
	var day int
	fmt.Scan(&day)
	switch day {
	case 1:
		fmt.Println("Monday")
	case 2:
		fmt.Println("Tuesday")
	case 3:
		fmt.Println("Wednesday")
	case 4:
		fmt.Println("Thursday")
	case 5:
		fmt.Println("Friday")
	case 6:
		fmt.Println("Saturday")
	case 7:
		fmt.Println("Sunday")
	default:
		fmt.Println("Invalid Day")
	}

	//logic if conditions are similar to other ones, but there are some tips like declaring variables in condition
	//and not converting types like 0 or '' -> false, also syntax is differences.

	//there are some ways of typing for loops like giving 3 arguments into loop (specify the number of cycle)
	//and throw using the range of array or map

	//writing switch without break, the switching to the next case should be used fallthrough, expressions in switches,
	//the last one is that the cases do not need to be constant
}
