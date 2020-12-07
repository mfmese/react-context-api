import React, { Component } from 'react'

export default class LifeCycle extends Component {

    constructor(props){
        super(props); //Burada super(props) yazılmas ise bu bileşen içerisinde this.props kullanamayız.
        console.log("constructor");
        this.state = {
            a:5
        };
    }

    componentDidMount() {
        console.log("componentDidMount");

        //Aşağıdaki gibi state değerini değiştirirsek updating işlemi tetikleneceği için render fonksiyonu yine çalışır.
        this.setState ({
            a:1
        });     
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
    }
    
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");

        return true; //Burada false olursa render ve componentDidUpdate fonksiyonları çalışmaz.
    }
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    
    render() {
        console.log("render");

        return (
            <div id="test-component">
                {/* <p>This is a test component</p> */}
            </div>
        )
    }
}
