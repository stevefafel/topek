import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar, TouchableHighlight } from "react-native"
import { ToolbarTextButton, ErrorHeader, UserSelectListView } from "../components"
import { Form, InputField, Field, FieldGroup, TouchableField } from "../react-native-fieldsX"
import { connectprops, PropMap } from "react-redux-propmap"
import { TopicActions } from "../state/actions"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.members = this.state.members.list;
    props.orgOwner = this.state.prefs.org.owner;
    props.currentUser = this.state.profile.user;
    props.updateError = this.state.topics.updateError;
    props.saveClick = this.bindEvent(TopicActions.add);
  }
}

@connectprops(Props)
export default class TopicAddMembersScreen extends Component {

  static navigationOptions = {
    title: "Choose Members",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      right: <ToolbarTextButton title="Next" active={true} onPress={() => state.params.rightClick()} />,
      backTitle: " "
    })
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({
        rightClick: () => this.props.navigation.navigate("TopicAddConfirm")
    });
  }

  render() {
    const { members, orgOwner, currentUser } = this.props;

    // compile list of potential members
    // all members + owner - current user
    let users = members.set(orgOwner.id, orgOwner).delete(currentUser.id);

    return (
      <View style={Styles.screen}>

        <StatusBar barStyle="dark-content" />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        
        <UserSelectListView
          users={users}
          onSelectedUsersChanged={(members) => this._onMembersChanged(members)}
        />

      </View>
    )
  }

  _onMembersChanged(members) {
    console.log(members);
  }

  async _saveType() {
    const { navigate } = this.props.navigation;
    //if (await this.props.saveClick(this.state.title))
    //  this.props.navigation.goBack(null);
    navigate("TopicAddTypeDetails")
  }
}

let styles = StyleSheet.create({
})
