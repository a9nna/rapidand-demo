import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Create Client',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new-product"
        options={{
          title: 'Create Products',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'pricetag' : 'pricetag-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'View Products',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'list' : 'list-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
