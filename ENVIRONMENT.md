# AttendX Environment Variable Specifications

| Variable | Description | Example / Default | Required |
| --- | --- | --- | --- |
| `PORT` | Server HTTP Port | `5000` | Yes |
| `NODE_ENV` | Environment mode | `production` | Yes |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | `super_secret_key` | Yes |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary storage cloud name | `your_cloud_name` | Optional |
| `OPENAI_API_KEY` | OpenAI API integration key | `sk-proj-...` | Optional |
