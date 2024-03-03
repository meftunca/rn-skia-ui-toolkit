import { Canvas, Path } from "@shopify/react-native-skia";
import * as React from "react";
import { Button, SafeAreaView, View, useWindowDimensions } from "react-native";
import { runOnUI, useSharedValue, makeMutable } from "react-native-reanimated";

const ExampleMatrix = () => {
  const [counter, setCounter] = React.useState(0);
  const pathRefs = React.useRef({});
  const sharedPathValues = useSharedValue([]);
  const { width, height } = useWindowDimensions();
  const [paths, setPaths] = React.useState([]);
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#121212",
        flex: 1,
        width: 500,
        alignItems: "center",
      }}
    >
      <Canvas
        style={{
          height: "100%",
          backgroundColor: "red",
          flex: 1,
          width: 500,
        }}
      >
        {/* <Path path="M 10 80 L 40 10 L 70 80" strokeWidth={2}  /> */}
        {paths.map((path, index) => (
          <Path key={index} {...path} color="white" />
        ))}
      </Canvas>
      <View>
        <Button
          title="Add Shape"
          onPress={() => {
            let newRandomPath = "M";
            for (let i = 0; i < 10; i++) {
              newRandomPath += ` ${Math.random() * width} ${
                Math.random() * height
              } L`;
            }
            newRandomPath = newRandomPath.slice(0, newRandomPath.length - 2);
            let id = Date.now().toString(32);
            console.log("id", id);
            const newPaths  = {
              id,
              path: newRandomPath,
              strokeWidth: 2,
            };
            setPaths((f) => [...f, newPaths]);

            // sharedPathValues.value = [
            //   ...sharedPathValues.value,
            //   {
            //     // random
            //     path: newRandomPath,
            //     strokeWidth: 2,
            //   },
            // ];
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExampleMatrix;
