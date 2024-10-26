export const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-950">
      <div className="grid gap-6 text-center">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-900 border-t-transparent dark:border-gray-50" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            加载中...
          </h2>
          <p className="animate-pulse text-lg font-medium text-gray-900 dark:text-gray-50">
            我们正在努力加载数据，请稍等片刻
          </p>
        </div>
      </div>
    </div>
  );
};
