--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id smallint NOT NULL,
    user_id smallint NOT NULL,
    recipe_id smallint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    comment character varying NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: ingredient_portions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_portions (
    id bigint NOT NULL,
    value double precision NOT NULL,
    label character varying NOT NULL,
    recipe_id bigint
);


ALTER TABLE public.ingredient_portions OWNER TO postgres;

--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ingredients (
    recipe_id bigint NOT NULL,
    unit_value double precision NOT NULL,
    unit_label character varying NOT NULL,
    description character varying NOT NULL,
    id bigint NOT NULL,
    portion double precision
);


ALTER TABLE public.recipe_ingredients OWNER TO postgres;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id bigint NOT NULL,
    created_by bigint NOT NULL,
    title character varying NOT NULL,
    directions character varying NOT NULL,
    serving_size bigint NOT NULL,
    time_to_make bigint NOT NULL,
    difficulty character varying NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    description character varying NOT NULL,
    image text NOT NULL,
    creator_name character varying NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.recipes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_allergy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_allergy (
    user_id smallint NOT NULL,
    allergy character varying
);


ALTER TABLE public.user_allergy OWNER TO postgres;

--
-- Name: user_comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_comment (
    user_id smallint NOT NULL,
    comment_id smallint NOT NULL
);


ALTER TABLE public.user_comment OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id smallint NOT NULL,
    name character varying(100),
    surname character varying(100),
    city character varying(50),
    state character varying(50),
    password character varying(100) NOT NULL,
    food_provider boolean DEFAULT false,
    email character varying NOT NULL,
    image text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, recipe_id, created_at, updated_at, comment) FROM stdin;
\.


--
-- Data for Name: ingredient_portions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient_portions (id, value, label, recipe_id) FROM stdin;
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ingredients (recipe_id, unit_value, unit_label, description, id, portion) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, created_by, title, directions, serving_size, time_to_make, difficulty, created_at, updated_at, description, image, creator_name) FROM stdin;
\.


--
-- Data for Name: user_allergy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_allergy (user_id, allergy) FROM stdin;
\.


--
-- Data for Name: user_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_comment (user_id, comment_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, city, state, password, food_provider, email, image) FROM stdin;
\.


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 168, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: ingredient_portions ingredient_portions_id_label_recipe_id_id1_label1_recipe_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_portions
    ADD CONSTRAINT ingredient_portions_id_label_recipe_id_id1_label1_recipe_id_key UNIQUE (id, label, recipe_id) INCLUDE (id, label, recipe_id);


--
-- Name: recipe_ingredients recipe_ingredient; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredient UNIQUE (recipe_id, id) INCLUDE (recipe_id, id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: user_comment user_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_comment
    ADD CONSTRAINT user_comment_pkey PRIMARY KEY (user_id, comment_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ingredient_portions ingredient_portions_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_portions
    ADD CONSTRAINT ingredient_portions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) NOT VALID;


--
-- Name: recipe_ingredients recipe_ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) NOT VALID;


--
-- Name: user_allergy user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_allergy
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: recipes user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT user_id FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

