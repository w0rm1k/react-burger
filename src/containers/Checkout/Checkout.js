import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let params of query.entries()) {
            console.log(params);
            ingredients[params[0]] = +params[1];
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
       this.props.history.goBack(); 
    }

    checkouContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkouContinuedHandler}/>
            </div>
        )
    }
}

export default Checkout;