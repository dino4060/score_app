// app/reports/page.tsx
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

// Lưu ý: data.json có thể không cần ở đây nếu nó chỉ dùng cho DataTable
// Nếu SectionCards hoặc ChartAreaInteractive cần data, bạn cần import vào.
// Tuy nhiên, theo yêu cầu, chỉ cần các component dưới đây.

export default function ReportsPage() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive />
                    </div>
                </div>
            </div>
        </div>
    );
}