import * as React from "react";
import Image from "next/image";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import LoginImg from "@/assets/image/login.svg";

import { useUser } from "./hooks";

export function User() {
  const { handleLogin, handleLogout, textToColor, googleUserInfo } = useUser();

  console.log(
    "process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  );

  return (
    <Box
      marginY={1}
      bgcolor="#EDF1F4"
      borderRadius={5}
      position="sticky"
      top={10}
      overflow="hidden"
      padding={!googleUserInfo ? 2 : 0}
      boxShadow={`0px 0px 10px #fff`}
    >
      {!googleUserInfo && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingBottom={2}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={LoginImg}
              width={200}
              height={200}
              alt="Login Image"
              priority
            />
          </Box>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
              size="large"
              width="100px"
            />
          </GoogleOAuthProvider>
        </Stack>
      )}

      {googleUserInfo && (
        <Stack flex={1} marginBottom={1}>
          <Box height="80px" bgcolor={textToColor} />
          <Stack gap={2} paddingX={2} paddingBottom={2} marginTop={-3}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                alt={googleUserInfo.name}
                src={googleUserInfo.picture}
                sx={{
                  width: 66,
                  height: 66,
                  marginBottom: 1,
                  border: "3px solid #fff",
                }}
              />

              <Box
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {googleUserInfo.name}
              </Box>
              <Box
                sx={{
                  fontSize: 12,
                }}
              >
                {googleUserInfo.email}
              </Box>
            </Box>

            <Divider />

            <Button
              size="small"
              variant="outlined"
              fullWidth
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
