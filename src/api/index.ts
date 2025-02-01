import { User, UserRole } from "@/types/auth";

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// 模拟用户数据
const mockUsers = [
  {
    id: "1",
    name: "AdminUser",
    email: "admin@example.com",
    username: "admin",
    password: "123",
    role: UserRole.ADMIN,
  },
  {
    id: "2",
    name: "NormalUser",
    email: "user@example.com",
    username: "user",
    password: "123",
    role: UserRole.USER,
  },
  {
    id: "3",
    name: "VIPUser",
    email: "vip@example.com",
    username: "vip",
    password: "123",
    role: UserRole.VIP,
  },
];

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 登录接口
export const login = async ({ username, password }: LoginParams): Promise<LoginResponse> => {
  // 模拟网络请求延迟
  await delay(1000);
  const user = mockUsers.find((u) => u.username === username && u.password === password);
  if (!user) {
    throw new Error("用户名或密码错误");
  }

  // 模拟生成 token
  const token = btoa(`${username}-${Date.now()}`);

  const userWithoutPassword = { ...user, password };

  return {
    token,
    user: userWithoutPassword,
  };
};

// 退出登录接口
export const logout = async (): Promise<void> => {
  // 模拟网络请求延迟
  await delay(500);
  // 实际项目中这里可能需要调用后端注销 token
  return Promise.resolve();
};
