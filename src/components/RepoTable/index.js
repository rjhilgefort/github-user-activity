import React from 'react';
// import { withProps } from 'recompose';
import { Table } from 'semantic-ui-react';
import {
  pathOr, compose, join, map, invoker, reject, equals,
} from 'ramda';
import { DateTime } from 'luxon';
import type { Repos, Repo, Url } from '../../types';
const {
  Header, Body, Row, HeaderCell, Cell,
} = Table;

const languageFromRepo = (
  repo: Repo
) => compose(
  pathOr('', ['primaryLanguage', 'name'])
)(repo);

const languageListFromRepo = (
  repo: Repo
) => compose(
  join(', '),
  reject(compose(equals, languageFromRepo)(repo)),
  map(pathOr('', ['name'])),
  pathOr([], ['languages', 'nodes']),
)(repo);

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

const CellLink = ({ ...props }: AProps) => (
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
