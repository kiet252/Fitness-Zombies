import { StyleSheet, Text, View } from "react-native";

type Props = {
  distance:string;
  unit?:string;
};

export default function RunDistanceDisplay({
 distance,
 unit="KILOMETERS"
}:Props){

return (
<View style={styles.container}>

<Text style={styles.distance}>
{distance}
</Text>

<Text style={styles.unit}>
{unit}
</Text>

</View>
);

}


const styles=StyleSheet.create({

container:{
position:"absolute",
top:"35%",
left:0,
right:0,
alignItems:"center"
},

distance:{
fontSize:64,
fontWeight:"900",
letterSpacing:-3,
color:"#fff"
},

unit:{
marginTop:-5,
color:"#3DDC84",
fontSize:13,
fontWeight:"700",
letterSpacing:2
}

});