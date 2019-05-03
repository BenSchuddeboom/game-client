import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setUsername} from '../actions/setUsername'
import {Link} from 'react-router-dom'
import './Landing.css'

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
        <div className='landing-div'>
        <h1 className='landing'>Enter your name:</h1>
        <form>
            <input 
                className='landing'
                name='name' 
                type='text'
                value={this.state.name} 
                onChange={this.handleChange} />
            <Link to='/game' onClick={this.handleSubmit}> 
                <br/><button className='landing'> play </button>
            </Link>
        </form>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {setUsername})(Landing)

