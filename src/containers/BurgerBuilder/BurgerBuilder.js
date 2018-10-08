import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false,
			loading: false,
			error: false
		};
	}

	componentDidMount() {
		console.log(this.props);
		// axios.get('https://react-burger-aa5db.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({
		// 			ingredients: response.data
		// 		})
		// 		//console.log(this.state);
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true})
		// 	});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
		//console.log(sum);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		//alert('You continue!');
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.props.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		// {meat: true, salad: false, cheese: true, bacon: true}
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients}/>
					<BuildControls
						ingredientsAdded={this.props.onIngredientAdded}
						ingredientsRemoved={this.props.onIngredientRemoved} 
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						ordered={this.purchaseHandler} />
				</Aux>
			);
			orderSummary = <OrderSummary 
				ingredients={this.props.ingredients}
				price={this.props.totalPrice}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}/>;
		};
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingrName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName}),
		onIngredientRemoved: (ingrName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingrName}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));