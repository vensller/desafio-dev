echo "Running migrations"
npx sequelize db:migrate
echo "Starting backend server"
npm run dev