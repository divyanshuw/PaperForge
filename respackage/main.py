import click

import respackage.query as query
import respackage.status as status


@click.group()
def cli()->None:
    pass
    
cli.add_command(query.query)
cli.add_command(query.upsert)
cli.add_command(status.status)