import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import {Constants} from 'expo';

const myData = {
  foo: 'bar',
  rivers: ["Mississippi", "Sacramento", "Russian"],
  numbers: 1,
}

const toArray = val => val instanceof Array ? val : [val]

const destinationObject = (value, key) => ({key, value});

class Row extends React.Component {
  constructor (props){ 
    super(props);
    this.state = {
        text: props.item.value
    }}

  render() {
    return (
      <View style={styles.padding}>
        <Text> {this.state.text} </Text>
      </View>
    );
  }
}

class CustomList extends React.Component {

  state = {
    obj: myData,
  }

  renderItem = section => {
    return (
      <Row {...section} />
      );
  }

  renderSectionHeader = ({section}) => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{section.key}</Text>
        </View>
    );
  }

  render() {
    const sections = Object.keys(this.state.obj).map(key => ({
      key,
      title: key,
      // turn array of values into array of objects in the shape {key, value}
      data: toArray(this.state.obj[key]).map(destinationObject),
    }))
    return (
    <View style={styles.container}>
    <SectionList
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={sections} 
      style={styles.list}
      />
    </View>
    );
  }

}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <CustomList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingLeft: 10,
    backgroundColor: 'gray',
  },
  row: {
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
  },
});
