import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  statusText: string;
  onBack: () => void;
  onRecenter: () => void;
  color?: string;
};

export default function RunTopBar({
  statusText,
  onBack,
  onRecenter,
  color="#3DDC84",
}: Props){

return (
<View style={styles.container}>

<Pressable
style={styles.circle}
onPress={onBack}
>
<Ionicons
name="chevron-back"
size={24}
color="white"
/>
</Pressable>


<View style={styles.badge}>

<View
style={[
styles.dot,
{
backgroundColor:color
}
]}
/>

<Text
style={[
styles.text,
{
color
}
]}
>
{statusText}
</Text>

</View>


<Pressable
style={styles.circle}
onPress={onRecenter}
>

<Ionicons
name="navigate-outline"
size={21}
color="#CFD8E1"
/>

</Pressable>

</View>
);
}


const styles=StyleSheet.create({

container:{
marginTop:20,
paddingHorizontal:18,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

circle:{
width:44,
height:44,
borderRadius:22,
alignItems:"center",
justifyContent:"center",
backgroundColor:"rgba(7,14,20,.9)"
},

badge:{
height:34,
paddingHorizontal:15,
borderRadius:18,
flexDirection:"row",
alignItems:"center",
backgroundColor:"rgba(7,14,20,.9)"
},

dot:{
width:8,
height:8,
borderRadius:4,
marginRight:8
},

text:{
fontSize:11,
fontWeight:"800",
letterSpacing:1
}

});