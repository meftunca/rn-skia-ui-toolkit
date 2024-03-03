import * as React from "react";
import type { TouchableOpacityProps, ViewProps } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface ListItemProps extends TouchableOpacityProps {
  left?: () => React.ReactNode;
  right?: () => React.ReactNode;
  title: string;
  description?: string;
}

const ListItemStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {},
  right: {},
  content: {
    flexGrow: 1,
  },
});

export const ListItem: React.FC<ListItemProps> = ({
  left,
  right,
  title,
  description,
  style,
}) => {
  return (
    <TouchableOpacity style={[ListItemStyle.container, style]}>
      <View style={ListItemStyle.left}>{left && left()}</View>
      <View style={ListItemStyle.content}>
        <Text>{title}</Text>
        {description && <Text>{description}</Text>}
      </View>
      <View style={ListItemStyle.right}>{right && right()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
interface ListProps extends ViewProps {
  // Props Here
}

export const List: React.FC<
  ListProps 
> = ({ children, style, ...props }) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};
