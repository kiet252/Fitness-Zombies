import {
Pressable,
StyleSheet,
Text
} from "react-native";


type Props={
text:string;
icon?:React.ReactNode;
onPress:()=>void;
variant?:"danger"|"primary";
};


export default function RunControls({
text,
icon,
onPress,
variant="danger"
}:Props){

return(

<Pressable
onPress={onPress}
style={[
styles.button,
variant==="danger"
&& styles.danger
]}
>

{icon}

<Text style={styles.text}>
{text}
</Text>

</Pressable>

);

}


const styles=StyleSheet.create({

button:{
height:52,
borderRadius:16,
alignItems:"center",
justifyContent:"center",
flexDirection:"row",
gap:8
},

danger:{
backgroundColor:"#FF4D4F"
},

text:{
color:"#fff",
fontSize:14,
fontWeight:"900"
}

});