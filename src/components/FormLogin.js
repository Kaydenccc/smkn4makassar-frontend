import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { LoginAsGuru } from "./LoginAsGuru";
import { LoginAsAdmin } from "./LoginAsAdmin";
import { LoginSiswa } from "./LoginSiswa";

export default function FormLogin() {
  const [type, setType] = React.useState("guru");

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <Typography variant="h5" color="white" className="tracking-widest">
          SISTEM ABSENSI
        </Typography>
        <div className="mb-4 h-2 p-2 text-white">SMK NEGERI 4 MAKASSAR</div>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible !max-h-fit">
          <TabsHeader className="relative z-0 ">
            <Tab value="guru" onClick={() => setType("guru")}>
              Guru
            </Tab>
            <Tab value="murid" onClick={() => setType("murid")}>
              Siswa
            </Tab>
            <Tab value="admin" onClick={() => setType("admin")}>
              Admin
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-hidden !max-h-fit"
            animate={{
              initial: {
                x: type === "guru" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "guru" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="guru" className="p-0">
              <LoginAsGuru />
            </TabPanel>
            <TabPanel value="murid" className="p-0">
              <LoginSiswa />
            </TabPanel>
            <TabPanel value="admin" className="p-0">
              <LoginAsAdmin />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
