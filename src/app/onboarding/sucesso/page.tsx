import { ConfettiLauncher } from "@/components/ConfettiLauncher";

export default async function SuccessOnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50 px-4 text-center">
      <ConfettiLauncher />
      <h1 className="text-4xl font-bold text-gray-900">Sucesso</h1>
    </div>
  );
}
