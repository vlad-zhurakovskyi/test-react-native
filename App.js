import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      jokes: {},
      text: [],
      result: [],
    };
  }

  componentDidMount() {
    fetch('https://api.chucknorris.io/jokes/categories').then(res=>{
      res.json().then(data => this.setState({categories: data}))
    });
  }

  getCategoriesJokes(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`).then(res=>{
      res.json().then(data => this.setState({jokes: data}))
    });
  };


  getMatchesJokes = (text) => {
    fetch(`https://api.chucknorris.io/jokes/search?query=${text}`).then(res => {
      res.json().then(data => this.setState({result: data.result}))
    });
  };

  render() {
    const {categories, jokes} = this.state;

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

          <TextInput
              style={{width: 200, height: 40, margin: 'auto'}}
              placeholder="Enter pls"
              onChangeText={this.getMatchesJokes}
          />

          <View>
            {this.state.result.map((item, index) => (
                <Text key={index}>{item.value}</Text>
            ))}
          </View>


          <View>
            {categories.map((item, index) => (
              <Text key={index} onPress={this.getCategoriesJokes.bind(this, item)}>
                {item}
              </Text>
            ))}
          </View>

          <Text>{jokes.value}</Text>
        </View>
    );
  }
}