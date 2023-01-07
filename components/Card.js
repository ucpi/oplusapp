import React,{useEffect,useState} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import RadioGroup from 'react-native-radio-buttons-group';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const Cards = (props) => {

return(
  <>
  <Card>
    <Card.Content>
      <Title>{props.title}</Title>
      <Paragraph>{props.price}</Paragraph>
      <Paragraph>{props.brand}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: props.image }} />

    <Card.Actions>
      <Button onPress={()=>{
        props.exit();
      }}>Rescan</Button>
      <Button onPress={()=>{
      props.getcat();
      }}>Ok</Button>
    </Card.Actions>
  </Card>
     
  </>
);
    }
export default Cards;