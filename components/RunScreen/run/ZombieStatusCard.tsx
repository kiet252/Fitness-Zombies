import {
StyleSheet,
Text,
View
} from "react-native";


type Props={
currentPace:string;
targetPace:string;
};


export default function ZombieStatusCard({
currentPace,
targetPace
}:Props){

return (

<View style={styles.card}>


<Text style={styles.title}>
SAFE ZONE
</Text>


<View style={styles.row}>

<View>
<Text style={styles.label}>
CURRENT PACE
</Text>

<Text style={styles.value}>
{currentPace}
</Text>
</View>


<View>
<Text style={styles.label}>
TARGET PACE
</Text>

<Text style={styles.value}>
{targetPace}
</Text>
</View>


</View>

</View>

);

}


const styles=StyleSheet.create({

card:{
backgroundColor:"rgba(7,13,18,.95)",
marginHorizontal:20,
padding:18,
borderRadius:20,
borderWidth:1,
borderColor:"#39E58C"
},

title:{
color:"#39E58C",
fontWeight:"900",
fontSize:16,
textAlign:"center",
marginBottom:12
},

row:{
flexDirection:"row",
justifyContent:"space-around"
},

label:{
color:"#8E98A5",
fontSize:10,
fontWeight:"700"
},

value:{
color:"#fff",
fontSize:22,
fontWeight:"900",
marginTop:5
}

});