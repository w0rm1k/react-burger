import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false
		};
	}

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
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
		this.props.history.push('/checkout');
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
		let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
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
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
		onIngredientRemoved: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
		onFetchIngredientsFailed: () => dispatch(burgerBuilderActions.fetchIngredientsFailed())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));