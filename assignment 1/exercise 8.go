package main

import (
	"encoding/json"
	"fmt"
)

type Product struct {
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Quantity int    `json:"quantity"`
}

func (p Product) toJson() (string, error) {
	jsonData, err := json.Marshal(p)
	if err != nil {
		return "", err
	}
	return string(jsonData), nil
}

func fromJson(jsonString string) (Product, error) {
	var p Product
	err := json.Unmarshal([]byte(jsonString), &p)
	if err != nil {
		return Product{}, err
	}
	return p, nil
}

func main() {
	var p Product
	fmt.Scan(&p.Name, &p.Price, &p.Quantity)
	jsonStr, err := p.toJson()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(jsonStr)

	decodeJson, err := fromJson(jsonStr)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(decodeJson)
}

//In Go, you work with JSON using the encoding/json package. While to encode is used json.Marshal, to decode is used json.Unmarshal

//Struct tags allow you to customize how the fields of a struct are mapped to JSON keys during encoding and decoding

//Errors during JSON encoding/decoding in Go are returned by the json.Marshal and json.Unmarshal functions.
