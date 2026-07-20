// src/pages/events/Events.jsx

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

// Layout
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Components
import Hero from "../../components/event/Hero";
import Filters from "../../components/event/Filters";
import FeaturedEvent from "../../components/event/FeaturedEvent";
import Grid from "../../components/event/Grid";
import Pagination from "../../components/event/Pagination";
import NewsletterCTA from "../../components/event/NewsletterCTA";

// Context
import { useEvent } from "../../context/EventContext";

// Styles
import "../../components/event/Event.css";

/* ==========================================================
   DEFAULT QUERY
========================================================== */

const DEFAULT_QUERY = {
    page: 1,
    limit: 9,
    search: "",
    category: "",
    eventType: "",
    featured: "",
    sort: "date_asc",
};

const Events = () => {

    /* ======================================================
       CONTEXT
    ====================================================== */

    const {

        events,

        featuredEvents,

        pagination,

        loading,

        error,

        loadEvents,

        loadFeaturedEvents,

    } = useEvent();

    /* ======================================================
       LOCAL STATE
    ====================================================== */

    const [query, setQuery] =
        useState(DEFAULT_QUERY);

    /* ======================================================
       LOAD EVENTS
    ====================================================== */

    useEffect(() => {

        loadEvents(query).catch((err) => {

            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load events."
            );

        });

    }, [query]);

    /* ======================================================
       LOAD FEATURED EVENTS
    ====================================================== */

    useEffect(() => {

        loadFeaturedEvents(1).catch((err) => {

            console.error(err);

        });

    }, []);

    /* ======================================================
       FILTERS
    ====================================================== */

    const handleFiltersChange = (filters) => {

        setQuery((previous) => ({

            ...previous,

            page: 1,

            search:
                filters.search ??
                previous.search,

            category:
                filters.category ??
                previous.category,

            eventType:
                filters.eventType ??
                previous.eventType,

            featured:
                filters.featured ??
                previous.featured,

            sort:
                filters.sort ??
                previous.sort,

        }));

    };

    /* ======================================================
       SEARCH
    ====================================================== */

    const handleSearch = (search) => {

        setQuery((previous) => ({

            ...previous,

            page: 1,

            search,

        }));

    };

    /* ======================================================
       RESET FILTERS
    ====================================================== */

    const handleResetFilters = () => {

        setQuery(DEFAULT_QUERY);

    };

    /* ======================================================
       PAGINATION
    ====================================================== */

    const handlePageChange = (page) => {

        if (page === pagination?.page) return;

        setQuery((previous) => ({

            ...previous,

            page,

        }));

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };

    /* ======================================================
       RETRY
    ====================================================== */

    const handleRetry = () => {

        loadEvents(query);

        loadFeaturedEvents(1);

    };

    /* ======================================================
       DERIVED VALUES
    ====================================================== */

    const featured =
        featuredEvents?.[0] ??
        events.find(
            (event) => event.featured
        ) ??
        null;

    const hasFeaturedEvent =
        featured !== null;

    const pageTitle =
        pagination?.total === 1
            ? "1 Event Found"
            : `${pagination?.total ?? 0} Events Found`;

    const pageDescription =
        loading
            ? "Loading events..."
            : (pagination?.total ?? 0) === 0
                ? "No events matched your search."
                : `Showing ${events.length} of ${pagination.total} event${
                      pagination.total === 1 ? "" : "s"
                  }.`;

    const heroStatistics = useMemo(() => ({

        totalEvents:
            pagination?.total ??
            events.length,

        upcomingEvents:
            events.filter(
                (event) => !event.hasEnded
            ).length,

        featuredEvents:
            events.filter(
                (event) => event.featured
            ).length,

    }), [events, pagination]);

    const paginationData = {

        page:
            pagination?.page ?? 1,

        limit:
            pagination?.limit ?? 9,

        total:
            pagination?.total ?? 0,

        totalPages:
            pagination?.totalPages ?? 1,

        hasNextPage:
            pagination?.hasNextPage ?? false,

        hasPrevPage:
            pagination?.hasPrevPage ?? false,

    };

    /* ======================================================
       PART 2 STARTS HERE
    ====================================================== */
        /* ======================================================
       RENDER
    ====================================================== */

    return (
        <>
            <Navbar />

            <main className="events-page">

                {/* Hero */}

                <Hero
                    search={query.search}
                    statistics={heroStatistics}
                    onSearch={handleSearch}
                />

                {/* Filters */}

                <Filters
                    filters={query}
                    onChange={handleFiltersChange}
                    onReset={handleResetFilters}
                />

                {/* Featured Event */}

                {hasFeaturedEvent && (
                    <FeaturedEvent
                        event={featured}
                    />
                )}

                {/* Events */}

                <section className="events-section">

                    <div className="container">

                        <div className="events-grid-header">

                            <div>

                                <h2>
                                    {pageTitle}
                                </h2>

                                <p>
                                    {pageDescription}
                                </p>

                            </div>

                        </div>

                        <Grid
                            events={events}
                            loading={loading}
                            error={error}
                            onRetry={handleRetry}
                        />

                        {!loading &&
                            !error &&
                            (pagination?.totalPages ?? 0) > 1 && (

                                <Pagination
                                    {...paginationData}
                                    onPageChange={
                                        handlePageChange
                                    }
                                />

                            )}

                    </div>

                </section>

                <NewsletterCTA />

            </main>

            <Footer />

        </>
    );

};

export default Events;