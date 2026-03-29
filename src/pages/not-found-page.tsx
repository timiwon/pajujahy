import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { BeeTrail } from "@/components/bee/bee-trail";

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-24">
            <div className="relative z-10 max-w-2xl space-y-5 text-center">
                <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
                    {t("not_found_title")}
                </h1>
                <p className="text-muted-foreground">
                    {t("not_found_before_link")}{" "}
                    <span className="inline-flex items-center gap-1">
                        <span aria-hidden="true">→</span>
                        <Link
                            to="/"
                            className="text-amber-500 underline-offset-4 hover:underline"
                        >
                            {t("not_found_link")}
                        </Link>
                    </span>
                    {t("not_found_after_link")}
                </p>
            </div>

            <BeeTrail />
        </main>
    );
}
