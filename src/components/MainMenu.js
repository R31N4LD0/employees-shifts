import { Burger, Button, Container, Menu } from "@mantine/core";
import { CalendarStats, BrandApplePodcast, Cards, Friends } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";

function MainMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";

  return(
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button onClick={toggle}>Menu</Button>
          {/* <Button onClick={toggle}><Burger size="xs" opened={opened} aria-label={label} />Menu</Button> */}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Navigate to...</Menu.Label>
          <Menu.Divider />
          <Menu.Item icon={<CalendarStats size={14} />} component="a" href="/">Shifts</Menu.Item>
          <Menu.Item icon={<BrandApplePodcast size={14} />} component="a" href="/employees">Employees</Menu.Item>
          <Menu.Item icon={<Cards size={14} />} component="a" href="/tables">Tables</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default MainMenu;