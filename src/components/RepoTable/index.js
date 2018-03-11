import React from 'react';
import { Table } from 'semantic-ui-react';
import {
  pathOr, compose, map, invoker, reject,
  propEq, anyPass, unless, equals,
} from 'ramda';
import { DateTime } from 'luxon';
import type { Repos, Repo, Url } from '../../types';
import LanguageLabel from '../LanguageLabel';

const {
  Header, Body, Row, HeaderCell, Cell,
} = Table;

const languageFromRepo = (
  repo: Repo
) => compose(
  unless(
    equals(''),
    (x) => <LanguageLabel {...x} />,
  ),
  pathOr('', ['primaryLanguage']),
)(repo);

const languageListFromRepo = (
  repo: Repo
) => {
  const primaryLanguage = pathOr('', ['primaryLanguage', 'name'], repo);
  return compose(
    map((x) => <LanguageLabel key={x.name} {...x} />),
    reject(anyPass([
      propEq('name', primaryLanguage),
      propEq('name', ''),
    ])),
    pathOr([], ['languages', 'nodes']),
  )(repo);
};

const pushedAtFromRepo = (
  repo: Repo
) => compose(
  invoker(0, 'toLocaleString'),
  DateTime.fromISO,
  pathOr('', ['pushedAt']),
)(repo);

type AProps = {
  url: Url,
  text: String,
};

const A = ({ url, text }: AProps) => (
  <a href={url}>{text}</a>
);

const CellLink = (props: AProps) => (
  <Cell><A {...props} /></Cell>
);

const RepoTable = ({
  repos,
}: {
  repos: Repos,
}) => (
  <Table
    definition
    style={{ 'fontSize': '.9em' }}
    size='small'
  >
    <Header>
      <Row>
        <HeaderCell />
        <HeaderCell>Owner</HeaderCell>
        <HeaderCell>Primary Language</HeaderCell>
        <HeaderCell>Other Languages</HeaderCell>
        <HeaderCell>UpdatedAt</HeaderCell>
      </Row>
    </Header>
    <Body>
      {repos && repos.map((repo, repoIndex) => (
        <Row key={repoIndex}>
          <CellLink url={repo.url} text={repo.name} />
          <CellLink url={repo.owner.url} text={repo.owner.login} />
          <Cell>{languageFromRepo(repo)}</Cell>
          <Cell>{languageListFromRepo(repo)}</Cell>
          <Cell>{pushedAtFromRepo(repo)}</Cell>
        </Row>
      ))}
    </Body>
  </Table>
);

export default RepoTable;
