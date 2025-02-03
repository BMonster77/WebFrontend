import React, {useEffect, useState} from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {Snackbar} from "@mui/base";
import {Alert} from "@mui/lab";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 在组件加载时检查是否有保存的用户名和密码
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // 自动勾选 "Remember this Device"
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const response = await axios.post("/api/login", { username, password });

      // 模拟一个响应对象（测试用）
      const response = {
        data: {
          success: true,               // 或者改为 false 测试失败情况
          redirectUrl: "/",   // 登录成功后跳转的地址
          message: "Invalid username or password." // 如果失败时返回的消息
        }
      };

      if (response.data.success) {
        // 登录成功后：
        // 1. 在前端通过 sessionStorage 保存管理员登录状态
        sessionStorage.setItem(
            "adminSession",
            JSON.stringify({
              username: username,
              loginTime: Date.now()
            })
        );


        // 登录成功后，根据后端返回的 URL 跳转
        window.location.href = response.data.redirectUrl;  // 可修改跳转页面

        // 如果选择记住设备，存储用户名和密码到 localStorage
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        } else {
          // 如果不选择，清除 localStorage 中存储的用户名和密码
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
      <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
              {title}
            </Typography>
        ) : null}

        {subtext}

        <form onSubmit={handleSubmit}>
        <Stack>
          {/*用户名*/}
          <Box>
            <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
            />
          </Box>
          {/*密码*/}
          <Box mt="25px">
            <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </Box>
          <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              my={2}
          >
            {/*是否记住密码*/}
            <FormGroup>
              <FormControlLabel
                  control={
                <Checkbox
                    defaultChecked
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
                  label="Remeber this Device"
              />
            </FormGroup>
            <Typography
                component={Link}
                href="/"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}
            >
              {/*Forgot Password ?*/}
            </Typography>
          </Stack>
        </Stack>
        {/*按钮*/}
        <Box>
          <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              // component={Link}
              // href="/"
              type="submit"
          >
            Sign In
          </Button>
        </Box>
        </form>

        {subtitle}

        {error && (
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
              <Alert severity="error">{error}</Alert>
            </Snackbar>
        )}
      </>
  );
}

export default AuthLogin;