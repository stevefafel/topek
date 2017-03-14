import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar, TouchableHighlight } from "react-native"
import { ToolbarTextButton, ErrorHeader, FieldButton } from "../components"
import { Form, InputField, Field, FieldGroup, TouchableField } from "../react-native-fieldsX"
import { connectprops, PropMap } from "react-redux-propmap"
import * as topicActions from "../state/actions/topicActions"
import Validate from "../lib/validate"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isUpdating = this.state.topics.isUpdating;
    props.updateError = this.state.topics.updateError;
    props.saveClick = this.bindEvent(topicActions.add);
  }
}

@connectprops(Props)
export default class TopicAddScreen extends Component {

  static navigationOptions = {
    title: "Enter Subject",
    header: ({state}, defaultHeader) => ({
      ...defaultHeader,
      left: <ToolbarTextButton title="Cancel" onPress={() => state.params.leftClick()} />,
      right: <ToolbarTextButton title="Next" active={true} onPress={() => state.params.rightClick()} />,
      backTitle: " "
    })
  }

  constructor(props){
    super(props);
    this.state = {
      title: ""
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      leftClick: () => this.props.navigation.goBack(null),
      rightClick: () => this._next()
    });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={Styles.screenFields}>

        <StatusBar barStyle="dark-content" />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        
        <Form
          ref="form"
          onChange={this._handleFormChange.bind(this)}>
        
          <FieldGroup>

            <InputField 
              ref="title"
              multiline={true}
              height={85}
              placeholder="Subject" 
              returnKeyType="done"
              onSubmitEditing={(event) => {}}
            />

          </FieldGroup>

          <FieldButton 
            title="Save Topic" 
            disabled={this.props.isUpdating}
            onPress={() => this._next()} />

        </Form>

      </View>
    )
  }

  _handleFormChange(data) {
    this.setState({
      title: data.title
    })
  }

  async _next() {
    //if (await this.props.saveClick(this.state.title))
    //  this.props.navigation.goBack(null);
    this.props.navigation.navigate("TopicAddType")
  }
}

let styles = StyleSheet.create({
})
