import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUsername} from '../actions/setUsername'
import {Link} from 'react-router-dom'

class Landing extends Component {
    state = {
        name : '',
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        this.props.setUsername(this.state.name)
    }

  render() {
    return (
        <>
        <p>hi</p>
        <form>
            <label>your name:</label>
            <input 
                name='name' 
                type='text'
                value={this.state.name} 
                onChange={this.handleChange} />
            <Link to='/game' onClick={this.handleSubmit}> 
                <button> submit </button>
            </Link>
        </form>
        </>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {setUsername})(Landing)

